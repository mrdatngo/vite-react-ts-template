import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Space,
  notification,
} from 'antd';
import { createAUser } from '../../../apis/users';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateUser = () => {
  const onFinish = (values: any) => {
    createAUser({
      address: values.address,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      name: values.name,
      gender: values.gender,
    })
      .then((res) => {
        if (res.status) {
          notification.success({
            message: 'Create user',
            description: 'Successful!',
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: 'Create user',
          description: 'Something went wrong!',
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Name'
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='DateOfBirth'
        name='dateOfBirth'
        rules={[
          { required: true, message: 'Please input your date of birth!' },
        ]}
      >
        <DatePicker format={'YYYY-MM-DD'} />
      </Form.Item>

      <Form.Item
        name='gender'
        label='Gender'
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder='select your gender'>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
          <Option value='other'>Other</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Address'>
        <Space.Compact>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >
            <Select placeholder='Select province'>
              <Option value='HN'>Ha Noi</Option>
              <Option value='HCM'>Tp. Ho Chi Minh</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input placeholder='Input street' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
