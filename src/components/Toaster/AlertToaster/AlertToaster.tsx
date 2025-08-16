import { useAlertStore } from "../../../store/alertStore";
import Toaster from "../Toaster";
import Alert from "../../Alert/Alert";

function AlertToaster() {
  const alerts = useAlertStore((s) => s.alerts);
  const remove = useAlertStore((s) => s.remove);

  return (
    <Toaster
      items={alerts}
      renderItem={(alert) => (
        <Alert
          id={alert.id}
          type={alert.type}
          message={alert.message}
          onDelete={remove}
          faded={alert.faded}
        />
      )}
    />
  );
}

export default AlertToaster;
