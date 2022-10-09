import { useEffect, useState } from "react";


const Welcome = (props) => {
  const { show, onCtaClick } = props;
  const [description, setDescription] = useState("");
  const [cta, setCta] = useState("");

  useEffect(() => {
    if (show === 'connect-wallet') {
      setDescription("Connect your wallet now to check out what new content Taylor is putting up!");
      setCta("Connect Wallet");
    } else if (show === 'mint') {
      setDescription("Mint Taylor's `utility NFT` and get exclusive access to her content while truly supporting her!");
      setCta("Mint Utility NFT");
    } else if (show === 'empty') {
      setDescription("Taylor has not published any content yet. Maybe support her now?");
      setCta("Donate");
    } else {
      console.error('Invalid show string', show);
    }
  }, [show, onCtaClick]);

  return (
    <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center mt-[8rem]">
      <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
        <span className="inline md:block">dappstar</span>
        <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">creator economy re-imagined</span>
      </h1>
      <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
        {description}
      </div>
      <div className="flex flex-col items-center mt-12 text-center">
        <button onClick={onCtaClick} className="navLink navLink-hover"> {cta} </button>
        <span className="relative inline-flex w-full md:w-auto">
          <a
            href="#_"
            className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            Purchase Now
          </a>
        </span>
        <a href="#" className="mt-3 text-sm text-indigo-500">Learn More</a>
      </div>
    </div>
  );
}

export default Welcome;