import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { RaisedButton } from "material-ui";
import { capitialize } from "../services/helper";
import { Route, Link } from "react-router-dom";
import { ShowUserDetails } from "./index";
window.location.pathname == "/dashboard/bloodDonors" ? document.body.style.backgroundImage = "url('')" : "";
export default class ShowDonors extends React.Component {
    constructor() {
        super();
        this.state = {
            detailsShow: false,
            index: 0
        }
    }
    componentWillMount = () => {
        this.props.fetchDonors();
    }
    redirector(i) {
        this.setState({ detailsShow: true });
        this.setState({ index: i });
    }
    render() {
        let donors = [];
        for (let prop in this.props.data.donors[0]) {
            let a = this.props.data.donors[0][prop];
            a.uid = prop;
            donors.push(a);
        }
        if (this.state.detailsShow) {
            return <Route path="/dashboard/bloodDonors/:contentName" render={_ => <ShowUserDetails index={this.state.index} data={donors} />} />
        } else {
            return <div>
                <Row>
                    <h1>Donors</h1>
                    {
                        donors.map((item, i) => {
                            let url = "" + window.location.pathname + "/" + item.uid;
                            console.log(url)
                            return <Col key={i} style={{ padding: 0, height: 400, marginLeft: 10 }} md={3}>
                                <Image responsive src={require("../Images/bloddonation.gif")} />
                                <div style={{ textAlign: "center" }}>
                                    <h1>{capitialize(item.userName)}</h1>
                                    <Link onClick={_ => { this.redirector(i); }} to={url}>
                                        <RaisedButton label="View Details" backgroundColor="#E6403F" labelColor="#fff" />
                                    </Link>
                                </div>
                            </Col>
                        })
                    }
                </Row>
            </div>
        }
    }
}