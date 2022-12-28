import React from 'react';
import icon1 from "../../../icons/1.png";
import icon2 from "../../../icons/2.png";
import icon3 from "../../../icons/3.png";
import icon4 from "../../../icons/4.png";
import icon5 from "../../../icons/5.png";
import icon6 from "../../../icons/6.png";
import icon7 from "../../../icons/7.png";
import delop from "../../../icons/delop.png";
import fb from "../../../icons/facebook.png";
import tw from "../../../icons/twitter.png";
import ins from "../../../icons/instagram.png";

// years
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
    return (
        <div>
            <div class="paymentWrapper">
                <div class="container">
                    <div class="wrapper">
                        <div class="payment">
                            <img class="payIcon" src={icon3} alt="" />
                            <h3>PAYMENT METHODS</h3>
                            <img class="pay" src={icon4} alt="" />
                            <img class="pay" src={icon5} alt="" />
                            <img class="pay" src={icon6} alt="" />
                            <img class="pay" src={icon7} alt="" />
                        </div>

                        <div class="payment">
                            <img class="payIcon" src={icon2} alt="" />
                            <h3>P. DANTE NAPOLI</h3>
                            <p>Via Enrico Pessina, 2</p>
                        </div>

                        <div class="payment">
                            <img class="payIcon" src={icon1} alt="" />
                            <h3>Worldwide delivery</h3>

                            <img class="payyImgg " src={delop} alt="" />
                        </div>
                    </div>
                </div>
            </div>


            <div class="footerSection">
                <div class="container">
                    <div class="footer">
                        <div class="sopopsa">
                            <p class="sapopaTile">SAPOPSA</p>
                            <div class="arLink">
                                <a href="about.html">ABOUT US</a>
                                <a href="#">TERMS & CONDITIONS</a>
                                <a href="privecy.html">PRIVACY POLICY</a>
                                <a href="contact.html">CONTACT US</a>
                            </div>
                        </div>
                        <div class="sopopsa">
                            <p>MEN</p>
                            <div class="arLink">
                                <a href="#">Men Polo Shirt</a>
                                <a href="#">Men t-Shirt</a>
                                <a href="#">Men Shirt</a>
                                <a href="#">HOODIE</a>
                                <a href="#">jacket</a>
                            </div>
                        </div>
                        <div class="sopopsa">
                            <p>WOMEN</p>
                            <div class="arLink">
                                <a href="#">woMen Shirt</a>
                                <a href="#">woMen t-Shirt</a>
                                <a href="#">SWEATSHIRT</a>
                                <a href="#">frock</a>
                                <a href="#">skist</a>
                            </div>
                        </div>
                        <div class="sopopsa">
                            <p>SPORTS</p>
                            <div class="arLink">
                                <a href="#">jersy kit</a>
                                <a href="#">sports t-shirt</a>
                                <a href="#">sports shorts</a>
                                <a href="#">Football Jersey</a>
                                <a href="#">TROUSER</a>
                            </div>
                        </div>
                    </div>
                    <div class="quickLink">
                        <a target="_blank" href="https://www.facebook.com/"> <img src={fb} alt="" /></a>
                        <a target="_blank" href="https://www.instagram.com/"><img src={ins} alt="" /></a>
                        <a target="_blank" href="https://www.twitter.com/"> <img src={tw} alt="" /></a>
                    </div>
                </div>
            </div>

            <div class="footerEnd">
                <span>Copyright &copy; {year} sapopsa</span>
            </div>
        </div>
    );
};

export default Footer;