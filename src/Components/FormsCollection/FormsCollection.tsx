import { useAppSelector } from '../../hooks';

function FormsCollection() {
  const forms = useAppSelector((store) => store.formData);
  if (forms.length <= 1) return <p>No one form!</p>;
  return (
    <>
      {forms.map((form, id) => (
        <div key={id}>
          <div>{form.type}</div>
          <div>
            <img src={form.picture} alt={form.name} />
          </div>
          <ul>
            <li>
              <span>Name: </span>
              <span>{form.name}</span>
            </li>
            <li>
              <span>Age: </span>
              <span>{form.age}</span>
            </li>
            <li>
              <span>Gender: </span>
              <span>{form.gender}</span>
            </li>
            <li>
              <span>Country: </span>
              <span>{form.country}</span>
            </li>
            <li>
              <span>Email: </span>
              <span>{form.email}</span>
            </li>
            <li>
              <span>Password: </span>
              <span>{form.password}</span>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default FormsCollection;
