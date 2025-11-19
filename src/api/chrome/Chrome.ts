class Chrome {
  public sendMessage(request: any, then: () => void): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab && activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, request, then);
      }
    });
  }
}

export default new Chrome();
