import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../api/user";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";

const EditUser = (props) => {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { convertObjectToArray, openNotification, convertRoleToName } =
    useAppContext();
  const { loadListUser, handleEditUser } = useUserContext();
  const loadUser = async (id) => {
    const response = await getUser(id);
    if (response.success) {
      setUser(response.data);
    }
  };
  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
    console.log(formData);
  };

  const handelCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    await handleEditUser(formData, id);
    setVisible(false);
    loadListUser();
  };

  const onRoleChange = (value) => {
    console.log(value);
    setFormData({ ...formData, role: value });
  };

  useEffect(() => {
    loadUser(id);
    if (Object.keys(user).length > 0 && visible) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [id, Object.keys(user).length, visible]);

  return (
    <div>
      <EditOutlined onClick={showModal} />
      <Modal
        title="Sửa thông tin"
        open={visible}
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={handelCancel}>
        <Form layout="vertical" form={form} initialValues={{ remember: true }}>
          <Form.Item
            label="Tên nhân viên"
            type="text"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}>
            <Input
              name="name"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
          <Form.Item
            label="Chức vụ"
            type="text"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}>
            <Select
              showSearch
              placeholder="Select a warrantyCenter"
              optionFilterProp="children"
              onChange={onRoleChange}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { label: "Cơ sở sản xuất", value: 2 },
                { label: "Đại lý phân phối", value: 3 },
                { label: "Trung tâm bảo hành", value: 4 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            type="text"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}>
            <Input
              name="email"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditUser;
