import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Showcase from "./components/showcase";
import { getContent, listContents } from "./utils/rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import Resource from "./components/resource";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [rerender, setRerender] = useState(false);
  const [photos, setPhotos] = useState([]);

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
      alert(err.message);
    }
    setLoading(false);
  };

  const handleItemClick = async (item) => {
    setContent(item);
    if (!(accessToken && accessToken.length>0)) {
      alert('Looks like either you are disconnected or connected with a wallet that does not contain a Fanstop NFT!')
    }
  }
  
  return (
    <div>
      <Navbar
        account={account}
        setAccount={setAccount}
        error={error}
        setError={setError}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        onGetContent={onGetContent}
        setPhotos={setPhotos}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Showcase photos={photos}/>}/>
          <Route path="/resource/:slug" element={<Resource />}/>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
