import { Link } from 'react-router-dom';
import FormsCollection from '../../Components/FormsCollection/FormsCollection';

function MainPage() {
  return (
    <div>
      <header className="main-header">
        <Link className="main-header__link" to="useref">
          Uncontrolled Form
        </Link>
        <Link className="main-header__link" to="usehook">
          Controlled Form
        </Link>
      </header>
      <main className="main">
        <FormsCollection />
      </main>
    </div>
  );
}

export default MainPage;
