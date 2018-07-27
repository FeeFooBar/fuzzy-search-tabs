import * as React from "react";
import { SearchBox, ISearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { ITabItem } from "./TabItem/TabItem";
import TabList from "./TabList/TabList";
import { Helper, Browser } from "./helpers";


interface IAppState {
    allTabs: ITabItem[];
    filteredTabs: ITabItem[];
}

export class App extends React.Component<{}, IAppState> {
    private _searchBox: ISearchBox;

    constructor(props: any) {
        super(props);

        this.state = {
            allTabs: [],
            filteredTabs: []
        };
    }

    componentWillMount(): void {
        Browser.getAllTabs(this.setStateTabs.bind(this));
    }

    componentDidMount(): void {
        this._searchBox.focus();
    }

    private _onDismiss(): void {
        window.close();
    }

    private setStateTabs(tabs: ITabItem[]): void {
        this.setState({
            allTabs: tabs.map((tab: any) => {
                return {
                    favicon: tab.favIconUrl,
                    index: tab.index,
                    url: tab.url,
                    title: tab.title
                } as ITabItem;
            }),
            filteredTabs: tabs.map((tab: any) => {
                return {
                    favicon: tab.favIconUrl,
                    index: tab.index,
                    url: tab.url,
                    title: tab.title
                } as ITabItem;
            })
        });
    }

    private filterTabs(pattern: string): void {
        const state: IAppState = this.state;
        let filteredTabs: ITabItem[] = [];
        filteredTabs = state.allTabs.filter((tab) => { return Helper.fuzzyMatch(pattern, tab.title); });

        this.setState({
            filteredTabs: filteredTabs
        });
    }

    private selectTopSearchResult(): void {
        const state: IAppState = this.state;
        if (state.filteredTabs.length >= 0) {
            const tab: ITabItem = state.filteredTabs[0];
            Browser.highlightTab(tab);
        }
    }

    render(): JSX.Element {
        const state: IAppState = this.state;
        return (
            <div className="FuzzySearchAppContianer" >
                <SearchBox
                    componentRef={(input: ISearchBox) => { this._searchBox = input; }}
                    onChange={async (pattern: string) => this.filterTabs(pattern)}
                    onSearch={() => { this.selectTopSearchResult(); this._onDismiss(); }}
                    underlined={true}
                    clearButtonProps={{ disabled: true }}
                />
                <TabList tabs={state.filteredTabs} />
            </div>
        );
    }
}
