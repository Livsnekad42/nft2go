import React from "react";
import * as H from "history";
import Upload from "./Upload";
import Files from "./Files";
import userStore from "../stores/userStore";

export interface IRouteComponentProps<P> {
    match: IMatch<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

export interface IMatch<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}


class Folder extends React.Component<IRouteComponentProps<any>> {

    currID = this.props.match.params.id;

    componentDidMount() {
        console.log('currId', this.currID)
        userStore.setCurrentFolder(this.currID.toString());
        userStore.getFolderList()
    }

    render() {
        return (
            <div>
                <Files />
               <Upload />
            </div>
        )
    }

};

export default Folder;