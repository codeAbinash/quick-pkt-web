import { usePopupAlertContext } from '../context/PopupAlertContext';

export default function PopupAlert() {
  const { data, updateData } = usePopupAlertContext();
  return (
    <div>
      <p>Data from Context: {data}</p>
      <button onClick={() => updateData(data + 1)}>Update Data</button>
    </div>
  );
}
