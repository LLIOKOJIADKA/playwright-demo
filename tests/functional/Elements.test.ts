import test from '../../lib/base/BaseTest';

test('Check elements', async({elementsPage,loginPage}) =>
{
    await test.step('Open Text Box page', async() => {
        await elementsPage.openElementsPage();
        await elementsPage.openTextBox();
        await elementsPage.fillTextBox('Pavel');
        await elementsPage.submit();
        await elementsPage.checkSubmitedValues();
    });

    await test.step('Open Check Box page', async() => {
        await elementsPage.openCheckBox();
        await elementsPage.expand();
        await elementsPage.checkCheckBoxes();
        await elementsPage.compateSelectedCheckBoxes();
    })
});