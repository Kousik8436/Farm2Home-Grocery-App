import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import SellerLogin from './SellerLogin';

const SellerAuthGuard = ({ children }) => {
  const { isSeller, fetchSeller } = useContext(AppContext);

  useEffect(() => {
    if (isSeller === null) {
      fetchSeller();
    }
  }, [isSeller, fetchSeller]);

  if (isSeller === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isSeller ? children : <SellerLogin />;
};

export default SellerAuthGuard;