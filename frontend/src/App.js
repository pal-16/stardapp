import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Showcase from "./components/showcase";
import { getContent, listContents } from "./utils/rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resource from "./components/resource";
import FilesView from "./components/FilesView";
import Sidebar from "./components/Sidebar";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [rerender, setRerender] = useState(false);
  const [photos, setPhotos] = useState([]);

  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    console.log('loading', loading)
    console.log('cookies', cookies);
    if (!loading) {
      setLoading(true);
      onGetContent()
    }
  }, []);

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
        />
        <Routes>
          <Route path="/" element={<Showcase photos={photos}/>}/>
          <Route path="/resource/:slug" element={<Resource />}/>
          <Route path="/admin/:slug" element={<Sidebar photos={photos}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
