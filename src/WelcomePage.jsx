import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbExternalLink } from 'react-icons/tb';
import './WelcomePage.css';
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import LangSwitch from "./Components/LangSwitch";

function WelcomePage(props) {
    const {t} = useTranslation();
    useEffect(() => {
        document.title = t("mainPage_docTitle");
        document.body.classList.add("welcome_page");
        return() => {
            document.body.classList.remove("welcome_page");
        }
    }, []);

    return(
        <>
            <nav id="nav">
                <LangSwitch />
                <a className="center nav_link" href="https://github.com/Bussun/mini-games-react" target="_blank">GitHub <TbExternalLink /></a>
            </nav>
            <div className="content">
                <h1 className="text_center mainPageTitle">{t("mainPage_title")}</h1>
                <h2 className="text_center mainPageSubTitle">{t("mainPage_subTitle")}</h2>
                <div className="gameLinks">
                    <Link className="gameLink" to="./games/rock-paper-scissors">{t("mainPage_gameBtns_rps")}</Link>
                    <Link className="gameLink" to="./games/tic-tac-toe">{t("mainPage_gameBtns_tictactoe")}</Link>
                    <Link className="gameLink" to="./games/2048">{t("mainPage_gameBtns_2048")}</Link>
                    {isMobile === true ? <></> : <Link className="gameLink" to="./games/etch-a-sketch">{t("mainPage_gameBtns_etchsketch")}</Link>}
                </div>
            </div>
            <footer>Copyright 2023 Denis LEDUC - Mentions légales sur la <a href="https://denisleduc.dev/" style={{color: "white"}}>page d'accueil</a></footer>
        </>
    )
}

export default WelcomePage;