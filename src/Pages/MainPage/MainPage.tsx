import { Link } from 'react-router-dom';
import FormsCollection from '../../Components/FormsCollection/FormsCollection';

function MainPage() {
  return (
    <div>
      <header>
        <Link to="useref">Uncontrolled</Link>
        <Link to="usestate">Controlled</Link>
      </header>
      <main>
        <FormsCollection />
      </main>
    </div>
  );
}

export default MainPage;
