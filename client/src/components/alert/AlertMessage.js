import { useAlertState } from '../../globalState/alertState';

const AlertMessage = () => {
  const alertState = useAlertState();
  const alerts = alertState.get();
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} >
        {alert.msg}
      </div>
    ))
  )
} 

export default AlertMessage;