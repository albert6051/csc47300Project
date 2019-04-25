import { Card, Button, Col, Row, Layout, } from 'antd';
import React from 'react';
import { Link } from "gatsby"
const JobItem = (props) => {
    let jobItem = props.jobs.map((item, index) =>
        <Col key={index} span={8} style={{ margin: '10px 0' }}>
            <Card title={item.campanyName} bordered={true}>
                <p>{item.jobTitle}</p>
                <div align="center">
                    <Button type="primary" ghost>
                        <Link to="/app/job-detail">Learn More</Link>
                    </Button>
                </div>
            </Card>
        </Col>
    );
    return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
                {jobItem}
            </Row>
        </div>
    );
}

const { Content } = Layout;
const postJob = (props) => {
    return (
        <Layout>
            <Content>
                <JobItem jobs={props.jobList} />
            </Content>
        </Layout>
    )
}
export default postJob;

