import React from 'react';

import Loader from "react-loader-spinner";
import LoadingOverlay from 'react-loading-overlay';


import './loader.styles.scss';

const Spinner = () => {
    return (
        <div className="spinner">
            {/* <Loader type="ThreeDots" color="#2BAD60" height="500" width="500" timeout={3000}/> */}
            <LoadingOverlay
  active="true"
  spinner
  text='Loading your content...'
  >
  <p>Some content or children or something.</p>
</LoadingOverlay>

        </div>
    )
}

export default Spinner
