import "./Home.sass"
import React, { useCallback, useState, useRef, useEffect, useReducer } from 'react';
import { set } from "lodash";
// import debounce from 'lodash/debounce';

const Home  = ( props ) => {

    function useDidUpdate(callback, deps) {
        const hasMount = useRef(false);
      
        useEffect(() => {
          if (hasMount.current) {
            callback();
          } else {
            hasMount.current = true;
          }
        }, deps);
      }

    // filters

    const [name, setName] = useState('');
    const [rocket, setRocket] = useState('');
    const [twitter, setTwitter] = useState('');

    const callSearch = useCallback(
      (name, rocket, twitter) => {
        props.search(name, rocket, twitter);
      },
      []
    );
    // const debouncedSearch = useCallback(debounce(callSearch, 200), []);


    // // Call search on input changes
    // useDidUpdate(() => {
    //   debouncedSearch(name, rocket, twitter);
    // }, [name, rocket, twitter]);

    useDidUpdate(() => callSearch(name, rocket, twitter), [
            name,
            rocket,
            twitter
    ]);

    const[history] = useState({name: [], rocket: [], twitter: []})
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const saveToHistory = (e) => {
      if (e.keyCode === 13) {
        let current = e.target.name
        if(current == "name") {
          history.name.push(name)
        }
        if(current == "rocket") {
          history.rocket.push(rocket)
        }
        if(current == "twitter") {
          history.twitter.push(twitter)
        }
        forceUpdate()
      }
    }

    return (
        <div className="Home">
            <div className="historyBar">
                History :
                {
                  history,name.length === 0
                    ? null
                    : <div style={{borderBottom: "1px solid white", width: "95%", fontSize: 20, minHeight: 25}}>name</div>
                }
                {
                  history.name.map( n => {
                    console.log("n", n);
                    return (
                      <div 
                        onClick={() => setName(n)}
                        style={{color: "white", fontSize: 22, width: "90%", overflowX: "overlay", overflowY: "hidden", paddingBottom: 14, minHeight: 25}}
                      >{n}</div>
                    )
                  })
                }
                                {
                  history,rocket.length === 0
                    ? null
                    : <div style={{borderBottom: "1px solid white", width: "95%", fontSize: 20, minHeight: 25}}>rocket</div>
                }
                {
                  history.rocket.map( n => {
                    console.log("n", n);
                    return (
                      <div 
                        onClick={() => setRocket(n)}
                        style={{color: "white", fontSize: 22, width: "90%", overflowX: "overlay", overflowY: "hidden", paddingBottom: 14, minHeight: 25}}
                      >{n}</div>
                    )
                  })
                }
                                {
                  history,twitter.length === 0
                    ? null
                    : <div style={{borderBottom: "1px solid white", width: "95%", fontSize: 20, minHeight: 25}}>twitter</div>
                }
                {
                  history.twitter.map( n => {
                    console.log("n", n);
                    return (
                      <div 
                        onClick={() => setTwitter(n)}
                        style={{color: "white", fontSize: 22, width: "90%", overflowX: "overlay", overflowY: "hidden", paddingBottom: 14, minHeight: 25}}
                      >{n}</div>
                    )
                  })
                }
            </div>
            <div className="main">
                <div className="search">
                    Search
                    <input name="name" placeholder="name" onKeyDown={e => saveToHistory(e)} onChange={e => setName(e.target.value)}/>
                    <input name="rocket" placeholder="rocket" onKeyDown={e => saveToHistory(e)} onChange={e => setRocket(e.target.value)}/>
                    <input name="twitter" placeholder="twitter" onKeyDown={e => saveToHistory(e)} onChange={e => setTwitter(e.target.value)}/>
                </div>
                <div className="results">

                    {
                      props.loading
                        ? <div style={{fontSize: 35, color: "white"}}>Loading ...</div>
                        : null
                    }

                    {
                      props.error
                        ? <div
                            style={{
                              fontSize: 25,
                              color: "white",
                              width: 400,
                              height: 150,
                              border: "1px solid white",
                              overflow: "scroll"
                            }}
                            >
                              {props.error}
                          </div>
                        : null
                    }

                    {
                        props.data?.users && !props.loading && !props.error
                        ? props.data.users.map( (user, id) => {
                            return (
                                <div key={id} className="resultContainer">
                                    <div className="resultItem">id: {user.id}</div>
                                    <div className="resultItem">name: {user.name}</div>
                                    <div className="resultItem">rocket: {user.rocket}</div>
                                    <div className="resultItem">twitter: {user.twitter}</div>
                                    <div className="resultItem">timestamp: {user.timestamp}</div>
                                </div>
                            )
                        })
                        : null
                    }


                </div>
            </div>
        </div>
    )
}

export default Home