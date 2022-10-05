import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { extractSlug } from "../utils/manipulator";

import { getContent, listContents } from "../utils/rest";

const Showcase = (props) => {
  console.log(props);
  return (
    <div className="showcase">
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 6}}>
        <Masonry gutter="10px">
          {props.photos.map((image, i) => (
            <div className="filter hover:grayscale hover:contrast-200" key={image.uri}>
              <Link to={`resource/${extractSlug(image.uri)}`} state={{filename: image.filename}}>
                <img
                    key={image.uri}
                    src={image.uri}
                    style={{width: "100%", display: "block"}}
                    alt=""
                    className="rounded-2xl"
                  /> 
              </Link>  
            </div>             
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
    
  )
}

export default Showcase;
