import React from "react";
import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

function FooterPage() {
  return (
    <div>
      <Footer container={true}>
        <div className="flex flex-row justify-center space-x-6 bg-slate-800 w-full pb-4">
          <Footer.Icon
            href="https://www.facebook.com/chamidu.ravihara.3/"
            icon={BsFacebook}
          />
          <Footer.Icon
            href="https://www.instagram.com/chamidu_ravi98/"
            icon={BsInstagram}
          />
          <Footer.Icon href="https://twitter.com/CRavihara" icon={BsTwitter} />
          <Footer.Icon
            href="https://github.com/ChamiduDev-5224"
            icon={BsGithub}
          />
        </div>
      </Footer>
    </div>
  );
}

export default FooterPage;
