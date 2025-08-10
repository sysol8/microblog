import mimetypes
from datetime import datetime
from uuid import uuid4
from typing import BinaryIO

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from server.config import (
    S3_SECRET_ACCESS_KEY,
    S3_ACCESS_KEY_ID,
    S3_DEFAULT_REGION,
    S3_ENDPOINT_URL,
    S3_BUCKET_NAME,
)

boto_cfg = Config(
    signature_version="s3v4",
    s3={
        "addressing_style": "virtual",
        "payload_signing_enabled": False,
    },
)

session = boto3.session.Session()
s3_client = session.client(
    "s3",
    endpoint_url=S3_ENDPOINT_URL,
    aws_access_key_id=S3_ACCESS_KEY_ID,
    aws_secret_access_key=S3_SECRET_ACCESS_KEY,
    region_name=S3_DEFAULT_REGION,
    config=Config(
        request_checksum_calculation="when_required",
        response_checksum_validation="when_required"
    ),
)

def _make_key(original_name: str) -> str:
    ext = "." + original_name.rsplit(".", 1)[-1].lower() if "." in original_name else ""
    prefix = datetime.utcnow().strftime("uploads/%Y/%m/%d")
    return f"{prefix}/{uuid4().hex}{ext}"

def upload_to_s3(file_obj: BinaryIO, original_name: str) -> str:
    try:
        file_obj.seek(0)
    except Exception:
        pass

    key = _make_key(original_name)
    content_type, _ = mimetypes.guess_type(original_name)
    extra = {"ACL":"public-read"}
    if content_type:
        extra["ContentType"] = content_type

    try:
        s3_client.upload_fileobj(
            Fileobj=file_obj,
            Bucket=S3_BUCKET_NAME,
            Key=key,
            ExtraArgs=extra or None,
        )
    except ClientError as e:
        code = e.response.get("Error", {}).get("Code")
        msg = e.response.get("Error", {}).get("Message")
        raise RuntimeError(f"S3 upload failed: {code} — {msg}") from e

    return f"{S3_ENDPOINT_URL.rstrip('/')}/{S3_BUCKET_NAME}/{key}"



