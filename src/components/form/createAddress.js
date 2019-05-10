import React from "react";
import { Form, Icon, Input, Button, Tooltip, message, Modal } from 'antd';
import { Auth, I18n } from 'aws-amplify';
import dict from "../dictionary/dictionary";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';
import { getLanguage } from "../../services/auth";

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const {
                visible, onCreate, onCancel, form
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Update Your Address"
                    okText="Update"
                    onCancel={onCancel}
                    onOk={onUpdate}
                >
                    <Form layout="vertical">
                        <Form.Item label="line1">
                            {getFieldDecorator('line1')(
                                <Input placeholder={I18n.get('Street Address Line 1')}
                                    name="line1"
                                    suffix={
                                        <Tooltip title={I18n.get('Enter the first line of the street address.')}>
                                            <Icon type="info-circle" />
                                        </Tooltip>}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="line2">
                            {getFieldDecorator('line2')(
                                <Input placeholder={I18n.get('Street Address Line 2')}
                                    name="line2"
                                    suffix={
                                        <Tooltip title={I18n.get('Enter the second line of the street address.')}>
                                            <Icon type="info-circle" />
                                        </Tooltip>}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="city">
                            {getFieldDecorator('city')(
                                <Input placeholder={I18n.get('City')}
                                    name="city"
                                    suffix={
                                        <Tooltip title={I18n.get('Enter the name of the city.')}>
                                            <Icon type="info-circle" />
                                        </Tooltip>}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="postalCode">
                            {getFieldDecorator('postalCode')(
                                <Input placeholder={I18n.get('Postal Code')}
                                    name="postalCode"
                                    suffix={
                                        <Tooltip title={I18n.get('Enter the postal code.')}>
                                            <Icon type="info-circle" />
                                        </Tooltip>}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="state">
                            {getFieldDecorator('state')(
                                <Input placeholder={I18n.get('State')}
                                    name="state"
                                    suffix={
                                        <Tooltip title={I18n.get('Enter the name of the state.')}>
                                            <Icon type="info-circle" />
                                        </Tooltip>}
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

class CreateAddressForm extends React.Component {
    state = {
        visible: false,
        lan: getLanguage()
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    // api call to create address function
    handleCreate = async () => {
        const form = this.formRef.props.form;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            let user = await Auth.currentAuthenticatedUser();
            const { attributes } = user;
            console.log("These values were entered: ", values);
            const createAddInput = {
                id: attributes.sub,
                line1: values["line1"],
                line2: values["line2"],
                city: values["city"],
                postalCode: values["postalCode"],
                state: values["state"]
            }
            try {
                const createAddress = await API.graphql(graphqlOperation(mutations.createAddress, { input: createAddInput }));
                console.log('success creating address');
            }
            catch (err) {
                console.log("error in creating address");
            }
            form.resetFields();
            this.setState({visible: false});
    }
}