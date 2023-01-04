import React from "react";
import * as H from "history";
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK} from "../interfaces/NFTInterface";
import {observer} from "mobx-react";
import NFTCard from "./NFTCard";

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

const MyNFTCollection= observer(
    class MyNFTCollection extends React.Component<IRouteComponentProps<any>> {

        currID = this.props.match.params.id;

        componentDidMount() {
            console.log('currId', this.currID)
            rmrkStore.getSingleCollection(this.currID)
        }

        render() {
            // @ts-ignore
            return (
                <div>
                    {!!rmrkStore.singleCollection &&
                    <div className='rmrk-coll' key={rmrkStore.singleCollection.collection.id}>
                        <h2>{rmrkStore.singleCollection.collection.name}</h2>
                        <p>ID: {rmrkStore.singleCollection.collection.id}</p>
                        <p>RMRK ID: {rmrkStore.singleCollection.collection.userID}</p>
                        {!!rmrkStore.singleCollection.collection.nfts && rmrkStore.singleCollection.collection.nfts.map((nft: INFTRMRK) => {
                            return (

                                <NFTCard id={nft.id} name={nft.name} metadata={nft.metadata} instance={nft.instance} key={nft.id}/>
                            )
                        })}
                    </div>
                    }
                </div>
            )
        }
    });
export default MyNFTCollection;