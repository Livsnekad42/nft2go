import React from 'react';
import { Suspense } from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import PrivateRoute from "../routes/PrivateRoute";
const Home = React.lazy(() => import('./Home'));
const Auth = React.lazy(() => import('./Auth'));
const Profile = React.lazy(() => import('./Profile'));
const Wallets = React.lazy(() => import('./Wallets'));
const Settings = React.lazy(() => import('./Settings'));
const Upload = React.lazy(() => import('./Upload'));
const NFTs = React.lazy(() => import('./NFTs'));
const RMRKAddMeta = React.lazy(() => import('./RMRKAddMeta'));
const RMRKAddNFT = React.lazy(() => import('./RMRMAddNFT'));
const RMRKAddCollection = React.lazy(() => import('./RMRMAddCollection'));
const NFTCollection = React.lazy(() => import('./NFTCollection'));
const NFT = React.lazy(() => import('./NFT'));
const MyNFTs = React.lazy(() => import('./MyNFTs'));
const MyNFTCollection = React.lazy(() => import('./MyNFTCollection'));
const Change = React.lazy(() => import('./Change'));
const ChangeIssuer = React.lazy(() => import('./ChangeIssuer'));
const Mnemo = React.lazy(() => import('./Mnemo'));
const Favorites = React.lazy(() => import('./Favorites'));
const Main = React.lazy(() => import('./Main'));
const Collections = React.lazy(() => import('./Collections'));
const ConnectWallet = React.lazy(() => import('./ConnectWallet'));
const Consent = React.lazy(() => import('./Consent'));
const MyProfile = React.lazy(() => import('./MyProfile'));
const OpenSea = React.lazy(() => import('./OpenSea'));
const OpenSeaNFT = React.lazy(() => import('./OpenSeaNFT'));
const OpenSeaCollections = React.lazy(() => import('./OpenSeaCollections'));
const OpenSeaCollection = React.lazy(() => import('./OpenSeaCollection'));
const Feed = React.lazy(() => import('./Feed'));

const MainContainer = () => {

    return (
        <>
        <main className='wrapper q'>
                <Switch>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Route exact path='/' component={Main}/>
                        <Route exact path='/lk/consent' component={Consent}/>
                        <Route exact path='/auth' component={Auth}/>
                        <Route exact path='/connect-wallet' component={ConnectWallet}/>
                        <PrivateRoute exact path='/lk/home' component={Home}/>
                        <Route exact path='/opensea' component={OpenSea}/>
                        <Route exact path='/feed' component={Feed}/>
                        <Route exact path='/collections' component={Collections}/>
                        <Route exact path='/lk/mnemo' component={Mnemo}/>
                        <PrivateRoute exact path='/lk/profile' component={Profile}/>
                        <PrivateRoute exact path='/lk/profile/myprofile' component={MyProfile}/>
                        <PrivateRoute path='/lk/favorites' component={Favorites}/>
                        <PrivateRoute exact path='/lk/profile/settings' component={Settings}/>
                        <PrivateRoute exact path='/lk/profile/settings/change' component={Change}/>
                        <PrivateRoute exact path='/lk/profile/wallets' component={Wallets}/>
                        <PrivateRoute exact path='/lk/upload' component={Upload} />
                        <PrivateRoute exact path='/lk/profile/rmrk/addMeta' component={RMRKAddMeta} />
                        <PrivateRoute exact path='/lk/profile/rmrk/addCollection' component={RMRKAddCollection} />
                        <PrivateRoute exact path='/lk/profile/rmrk/addNFT' component={RMRKAddNFT} />
                        <Route exact path='/nfts/' component={NFTs}/>
                        <Route exact path='/opensea/collections/' component={OpenSeaCollections}/>
                        <Route exact path='/opensea/collections/:id' component={OpenSeaCollection}/>
                        <PrivateRoute exact path='/lk/mynfts/' component={MyNFTs}/>
                        <Route exact path='/nfts/:id' component={NFT}/>
                        <Route exact path='/collections/:id' component={NFTCollection}/>
                        <Route exact path='/opensea/nfts/:id' component={OpenSeaNFT}/>
                        <PrivateRoute exact path='/lk/mynfts/:id' component={NFT}/>
                        <PrivateRoute exact path='/lk/mynfts/collections/:id' component={MyNFTCollection}/>
                        <PrivateRoute exact path='/lk/mynfts/collections/change/:id' component={ChangeIssuer}/>
                    </Suspense>
                </Switch>
            </main>
            </>
    )
};

export default MainContainer;
