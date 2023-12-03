/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import getPasswordStrength from '../../utils/getPasswordStrength';
import './PasswordStrength.css';

function PasswordStrength({ password }: { password: string }) {
  const [strength, setStrength] = useState(5);
  useEffect(() => {
    async function getStrength() {
      await getPasswordStrength(password).then((e) => {
        setStrength(e);
      });
    }
    getStrength();
  }, [password]);

  return (
    <div className="password-strength__container">
      <div
        className="password-strength__indicator"
        style={{
          width: `${100 / (strength + 1)}%`,
          background: `rgb(${255 - 255 / strength},${255 / strength}, 0)`,
        }}
      />
    </div>
  );
}

export default PasswordStrength;
