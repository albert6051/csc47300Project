import React from 'react';
import { Card, Icon, Button } from 'antd';
import { getUser } from '../../services/auth';
import { I18n } from 'aws-amplify';
import dict from "../dictionary/dictionary"

/**
 * The component Education will display the user's education history
 */
const Education = (props) => {

    let educationList = [...props.education];
    let display = educationList.map(item =>
            <li key={item.id}>
                <Card
                    size="default"
                    title={item.schoolName}
                    extra={props.allowEdit ? <Button type="danger" onClick={props.deleteEdu.bind(null, item.id)}>{I18n.get('Delete')}</Button> : null}
                    style={{ width: "80%" }}
                >
                    <p className="description" align="left" style={{ fontSize: 18 }}><Icon type="book" /><b> {I18n.get('Degree')}: </b> {item.degree}</p>
                    <p className="description" align="left" style={{ fontSize: 18 }}><Icon type="home" /><b> {I18n.get('Location')}: </b>{item.city + ", " + item.country}</p>
                    <p className="description" align="left" style={{ fontSize: 18 }}><Icon type="clock-circle" /><b> {I18n.get('Years')}: </b>{item.startYear} to {item.endYear}</p>
                </Card>
                <br />
            </li>
    )

    let show = <div align="center">{display}</div>

    return show;
}

export default Education;