import { getAccessToken, removeAccessToken } from "../utils/rest";
import { connectWallet, disconnectWallet } from "../utils/connectWallet";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const  {
    account,
    setAccount,
    setError,
    setAccessToken,
    onGetContent,
    setPhotos,
  } = props;

  const onConnectWallet = async () => {
    const { address, message, signature} = await connectWallet();
    console.log(address, message, signature);
    setAccount(address);
    const {accessToken, error} = await getAccessToken({signature, walletPublicAddress:address});
    if (error) {
      setError(error);
    }
    if (accessToken) {
      setAccessToken(accessToken);
      await onGetContent()
    }
  };

  const ondisconnectWallet = async () => {
    await disconnectWallet();
    setAccount("");
    const resp = await removeAccessToken();
    setAccessToken(null);
    setPhotos([]);
    console.log(resp);
  };

  return (
    <header className="navbar">
      <Link to={`/`}>
        <img src="../logo.png" alt="logo" className="h-28"/>
      </Link>  
    <div>
      {(() => {
        const publicAddr = account;
        if (publicAddr && publicAddr !== "") {
          return <button className="navLink" disabled>Connected to {publicAddr}</button>;
        }
        return <button onClick={onConnectWallet} className="navLink navLink-hover"> Connect Wallet </button>;
      })()}
      &nbsp;
      {(() => {
        const publicAddr = account;
        if (publicAddr && publicAddr !== "") {
          return <button onClick={ondisconnectWallet} className="navLink navLink-hover">Disconnect</button>;
        }
      })()}
    </div>
  </header>
  );
};

export default Navbar;
