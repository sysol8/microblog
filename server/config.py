import os
from dotenv import load_dotenv

load_dotenv()

S3_ENDPOINT_URL = os.getenv("AWS_ENDPOINT_URL")
S3_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
S3_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION")
S3_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")