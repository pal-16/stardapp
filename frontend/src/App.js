import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import { getContent, listContents } from "./utils/rest";
import { getAccount } from "./utils/wallet";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [content, setContent] = useState(null);
  const [contentUri, setContentUri] = useState("");
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [contentsList, setContentList] = useState([]);

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(JSON.stringify(account));
      setContentList(await listContents());
    })();
  }, []);

  
  useEffect(() => {
    (async () => {
      const { uri, error } = await getContent(content);
      console.log('Getting content', content);
      if (uri) {
        console.log(uri);
      }
      if (error) {
        // alert(error);
        setContentUri('');
      } else {
        setContentUri(uri);
      }
    })();
  }, [content]);

  const onGetContent = async () => {
    try {
      setLoading(true);
      const { uri, error } = await getContent(content);
      if (error) {
        // alert(error);
        setContentUri('');
      } else {
        setContentUri(uri);
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-100">
      <Navbar
        account={account}
        setAccount={setAccount}
        error={error}
        setError={setError}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        onGetContent={onGetContent}
      />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="mt-2">
          {(() => {
            let table;
            if (contentsList && contentsList.length > 0) {
              console.log('printing contentsList...')
              console.log(contentsList);
              return (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <td>name</td>
                        <td>cid</td>
                        <td>content_type</td>
                        <td>size</td>
                        <td>created_at</td>
                      </tr>
                    </thead>
                    <tbody>
                      {contentsList.map(item => {
                        return (
                          <tr key={item.cid}>
                            <td>{ item.name }</td>
                            <td><button onClick={()=> setContent(item.name)}>{ item.cid }</button></td>
                            <td>{ item.content_type }</td>
                            <td>{ item.size }</td>
                            <td>{ item.created_at }</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <br />
                  <img src={contentUri} alt="loading..." />
                </div>
              );
            }
            // if (accessToken) {
            //   return <img src={content} alt="loading..." />
            // }
            return (
              <div></div>
            );
          })()}
          
        </div>
      </div>
    </div>
  );
};

export default App;
