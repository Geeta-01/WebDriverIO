import { browser } from '@wdio/globals'
import logger from '../../utils/logger';
import utils from '../../utils/utils.js';

class launchPage {

    get acceptCookiesButton() { return $('//button[@id = "onetrust-accept-btn-handler"]') };
    get closeCookiesIcon() { return $('//button[@aria-label = "Close"]') };
    get heading() { return $('//*[@id="calculator-intro-section"]/h2') };
    get infoBanner() { return $('//*[@id="assumption-label"]') };

    /* Launch the application */
    async launch() {
        try {
            await browser.reloadSession();
            await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
            await browser.maximizeWindow();
            await this.closeCookiesPopUp();
        } catch (error) {
            logger.error(`Error launching the application: ${error}`);
            throw error;
        }
    }

 //Close the cookies pop up 
 async closeCookiesPopUp() {
    try {
        await utils.elementAction(this.closeCookiesIcon, 'click', null, 'Close Cookies Icon');
    } catch (error) {
        logger.error(`Error closing the cookies pop up: ${error}`);
        throw error;
    }
}
}
export default new launchPage();