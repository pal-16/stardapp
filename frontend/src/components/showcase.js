import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { getContent, listContents } from "../utils/rest";

const Showcase = (props) => {
  // const [photos, setPhotos] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const contentList = (await listContents());
  //     const uris = [];
  //     contentList.forEach(async item => {
  //       const { uri, error } = await getContent(item.name);
  //       if (!error) {
  //         uris.push({uri, filename: item.name});
  //         console.log(uri);
  //         setPhotos(uris);
  //         console.log(photos);
  //       }
  //     });
  //   })();
  // }, []);

  return (
    <div className="showcase">
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 6}}>
        <Masonry gutter="10px">
          {props.photos.map((image, i) => (
            <div className="filter hover:grayscale hover:contrast-200" key={image.uri}>
              {/* <Link to={image.filename}> */}
                <img
                    key={image.uri}
                    src={image.uri}
                    style={{width: "100%", display: "block"}}
                    alt=""
                    className="rounded-2xl"
                  /> 
              {/* </Link>   */}
            </div>             
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
    
  )
}

export default Showcase;
