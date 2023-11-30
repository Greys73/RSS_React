import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <header>Main Page</header>
      <main>
        <Link to="useref">Uncontrolled</Link>
        <Link to="usestate">Controlled</Link>
      </main>
    </div>
  );
}

export default MainPage;
