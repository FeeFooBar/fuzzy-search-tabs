import "./TabList.scss";
import * as React from "react";
import TabItem, { ITabItem } from "../TabItem/TabItem";
import {
    DetailsList,
    SelectionMode,
    DetailsListLayoutMode,
    IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Label } from "office-ui-fabric-react/lib/Label";


export interface ITabList {
    tabs: ITabItem[];
}

export default class TabList extends React.Component<ITabList, {}> {

    private _columns: IColumn[] = [
        {
            key: "column1",
            name: "favicon",
            isIconOnly: true,
            minWidth: 8,
            maxWidth: 16,
            isPadded: false,
            onRender: (item: ITabItem) => {
                return <img src={item.favicon} className={"TabList-IconImage"} />;
            }
        },
        {
            key: "column2",
            name: "title",
            minWidth: 16,
            maxWidth: 150,
            onRender: (item: ITabItem) => {
                return <TabItem {...item} />;
            }
        }
    ];

    private _onInvokeSelectedItem(item: ITabItem): void {
        chrome.tabs.highlight({ tabs: item.index }, () => { return; });
    }

    render(): JSX.Element {
        const props: ITabList = this.props;

        return (
            <div className="TabList">
                {props.tabs.length > 0 &&
                    <DetailsList
                        items={props.tabs}
                        setKey="set"
                        columns={this._columns}
                        isHeaderVisible={false}
                        compact={true}
                        selectionMode={SelectionMode.none}
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionPreservedOnEmptyClick={true}
                        enterModalSelectionOnTouch={true}
                        onItemInvoked={this._onInvokeSelectedItem}
                    />
                }
                {props.tabs.length === 0 &&
                    <Label>no result found</Label>
                }
            </div>
        );
    }
}