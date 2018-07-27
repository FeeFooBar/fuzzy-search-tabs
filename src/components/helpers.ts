export module Browser {
    declare var browser: any;

    export function highlightTab(tab: any): void {
        if (chrome && chrome.tabs) {
            chrome.tabs.highlight({ tabs: tab.index }, () => { return; });
        } else {
            browser.tabs.update(tab.id, { active: true, highlighted: true });
        }
    }

    export function getAllTabs(callback: (tabs: any) => void): void {
        if (chrome && chrome.tabs) {
            chrome.tabs.query({ currentWindow: true }, (tabs: any) => callback(tabs));
        } else {
            browser.tabs.query({ currentWindow: true }, (tabs: any) => callback(tabs));
        }
    }
}

export module Helper {
    export function fuzzyMatch(needle: string, haystack: string): boolean {
        if (needle === "" || haystack === "") {
            return true;
        }

        needle = needle.toLowerCase().replace(/ /g, "");
        haystack = haystack.toLowerCase();

        let i: number = 0;
        let j: number = 0;
        while (j < haystack.length && i < needle.length) {
            if (needle[i] === haystack[j]) {
                i++;
            }
            j++;
        }

        if (j > haystack.length || i < needle.length) {
            return false;
        }

        return true;
    }
}