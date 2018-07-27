import "./TabItem.scss";
import * as React from "react";
import { Label } from "office-ui-fabric-react/lib/Label";

export interface ITabItem {
    favicon: string;
    index: number;
    url: string;
    title: string;
}

export default class TabItem extends React.Component<ITabItem, {}> {
    render(): JSX.Element {
        const props: ITabItem = this.props;
        return (
            <div className="TabItem">
                <div className="TabItem-TabTitle">
                    <Label className="TabItem-TabTitle-Label">{props.title}</Label>
                </div>
            </div>
        );
    }
}