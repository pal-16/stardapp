import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Showcase from "./components/showcase";
import { generateTokenUri, getContent, listContents } from "./utils/rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleFileView from "./components/SingleFileView";
import FilesView from "./components/FilesView";
import Sidebar from "./components/Sidebar";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import DonateModal from "./components/DonateModal";
import Minter2 from './artifacts/contracts/Minter2.sol/Minter2.json'
import { ethers } from 'ethers'
import { getContractBalance, hasEthereum } from "./utils/connectWallet";
import { NEXT_PUBLIC_MINTER_ADDRESS, MINT_PRICE } from "./constants";
import Welcome from "./components/Welcome";
import { connectWallet, disconnectWallet } from "./utils/connectWallet";
import { getAccessToken, removeAccessToken } from "./utils/rest";
import TokensView from "./components/TokensView";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [rerender, setRerender] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [openManageTokensScreen, setOpenManageTokensScreen] = useState(false);

  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    console.log('loading', loading)
    console.log('cookies', cookies);
    (getContractBalance("0x2F63f06BBaE33967b30e9a60077EF61f7F3c3164")).then(res => console.log(res));
    if (!loading) {
      setLoading(true);
      onGetContent()
    }
  }, []);

  const onConnectWallet = async () => {
    const { address, message, signature} = await connectWallet();
    console.log(address, message, signature);
    localStorage.setItem('address', address);
    setAccount(address);
    const {accessToken, accessLevel, error} = await getAccessToken({signature, walletPublicAddress:address});
    if (error) {
      setError(error);
    }
    if (accessToken) {
      localStorage.setItem('accessLevel', accessLevel);
      setAccessToken(accessToken);
      await onGetContent()
    }
  };

  const ondisconnectWallet = async () => {
    await disconnectWallet();
    localStorage.removeItem('address');
    localStorage.removeItem('accessLevel');
    setAccount("");
    const resp = await removeAccessToken();
    setAccessToken(null);
    setPhotos([]);
    console.log(resp);
  };

  const onGetContent = async () => {
    try {
      setLoading(true);
      const contentList = (await listContents());
      contentList.forEach(async item => {
        const { uri, error } = await getContent(item.name);
        if (!error) {
          setPhotos(photos => [...photos, {uri, filename: item.name}]);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const handleItemClick = async (item) => {
    setContent(item);
    if (!(accessToken && accessToken.length>0)) {
      alert('Looks like either you are disconnected or connected with a wallet that does not contain a Fanstop NFT!')
    }
  }

  const mint = async () =>  {
    // Get wallet details
    if(!hasEthereum()) return
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()

      try {
        const address = await signer.getAddress()

        // setMintLoading(true);
        // Interact with contract
        const contract = new ethers.Contract(NEXT_PUBLIC_MINTER_ADDRESS, Minter2.abi, signer)
        const { data, error } = await generateTokenUri();
        if (error) {
          console.error(error);
          return;
        }
        const { tokenUri } = data;
        if (!tokenUri) {
          console.error(`Could not find tokenUri`);
          return;
        }
        const transaction = await contract.mint(tokenUri, { value: ethers.utils.parseEther(MINT_PRICE.toString()) })
        await transaction.wait()

        // setMintMessage(`Congrats, you minted ${mintQuantity} token(s)!`)
        // setMintError(false)
      } catch(error) {
        // setMintMessage('Connect your wallet first.');
        // setMintError(true)
        console.error(error);
      }
    } catch(error) {
        // setMintMessage(error.message)
        // setMintError(true)
      console.error(error);
    }
    // setMintLoading(false)
  }

  
  const donate = async () =>  {}

  return (
    <div>
      <BrowserRouter>
        <Navbar
          account={account}
          setAccount={setAccount}
          error={error}
          setError={setError}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          onGetContent={onGetContent}
          setPhotos={setPhotos}
          onConnectWallet={onConnectWallet}
          ondisconnectWallet={ondisconnectWallet}
          setOpenManageTokensScreen={setOpenManageTokensScreen}
        />
        {/* <button onClick={mint} className="mt-[8rem]"> Mint </button> */}
        <Routes>
          <Route path="/" element={
            photos && photos.length > 0
              ? <Showcase photos={photos}/>
              : !account || ['', 'undefined'].includes(account)
                ? <Welcome show={"connect-wallet"} onCtaClick ={onConnectWallet}/>
                : !accessToken || ['', 'undefined'].includes(accessToken)
                  ? <Welcome show={"mint"} onCtaClick={mint}/>
                  : <Welcome show={"empty"} onCtaClick={donate}/>
          }/>
          <Route path="/resource/:slug" element={<SingleFileView />}/>
          <Route path="/admin/:slug" element={<Sidebar photos={photos}/>} />
          <Route path="/manage" element={<TokensView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
