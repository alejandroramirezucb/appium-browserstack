class AlarmPage {

  get alarmTab() { return $('~Alarm'); }
  get addButton() { return $('~Add alarm'); }
  get okBtn() { return $('id=android:id/button1'); }
  get cancelBtn() { return $('id=android:id/button2'); }
  get deleteBtn() { return $('id=com.chen.deskclock:id/delete'); }

  hourElement(hour) {
    return $(`~${hour}`);
  }

  minuteElement(minute) {
    return $(`~${minute}`);
  }

  alarmWithTime(time) {
    return $(`android=new UiSelector().text("${time}")`);
  }

  async openAlarmTab() {
    await this.alarmTab.waitForDisplayed({ timeout: 10000 });
    await this.alarmTab.click();
  }

  async elegirHora(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 5000 });
    await this.addButton.click();

    await this.hourElement(hour).click();
    await this.minuteElement(minute).click();

    await browser.takeScreenshot();
  }

  async createAlarm(hour, minute) {
    await this.elegirHora(hour, minute);
    await this.okBtn.click();
  }

  async cancelAlarm(hour, minute) {
    await this.elegirHora(hour, minute);
    await this.cancelBtn.click();
  }

  async isAlarmDisplayed(time) {
    const alarm = this.alarmWithTime(time);
    await alarm.waitForDisplayed({ timeout: 5000 });
    return alarm.isDisplayed();
  }

  async deleteAlarm(time) {
    await expect(this.alarmWithTime(time)).toBeDisplayed();
    await this.deleteBtn.waitForDisplayed({ timeout: 5000 });
    await this.deleteBtn.click();
    await browser.takeScreenshot();
  }

}

module.exports = new AlarmPage();
