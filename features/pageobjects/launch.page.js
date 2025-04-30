import { browser } from '@wdio/globals'
import logger from '../../utils/logger';
import utils from '../../utils/utils.js';

class launchPage {
    //* Page locators */
    get acceptCookiesButton() { return $('//button[@id = "onetrust-accept-btn-handler"]') };
    get closeCookiesIcon() { return $('//button[@aria-label = "Close"]') };
    get heading() { return $('//*[@id="calculator-intro-section"]/h2') };
    get infoBanner() { return $('//*[@id="assumption-label"]') };

    /* Launch the application */
    //launch the application and navigate to the retirement calculator page
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

 
 //This method is used to close the cookies pop up if it is displayed on the page.
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