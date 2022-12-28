import React, { useEffect } from "react";
import SearchUser from "../../components/SearchFilter/SearchUser";
import TableInfo from "../../components/TableInfo/TableInfo";
import AddUser from "../../components/UserForm/AddUser";
import DeleteUser from "../../components/UserForm/DeleteUser";
import EditUser from "../../components/UserForm/EditUser";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";
import Default from "../../Layouts/Default";

const User = () => {
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div>
          <EditUser id={record._id} />
          <DeleteUser id={record._id} />
        </div>
      ),
    },
  ];

  const {
    userState: { listUser, isLoading },
    loadListUser,
  } = useUserContext();

  const { convertRoleToName } = useAppContext();

  useEffect(() => {
    loadListUser();
  }, []);

  const dataSource = listUser?.map((user, index) => {
    return {
      ...user,
      key: index + 1,
      role: convertRoleToName(user.role),
    };
  });

  return (
    <div className="w-full">
      <Default tagName="tk">
        <SearchUser data={dataSource} />
        <div className="mt-5">
          <AddUser />
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            loading={isLoading}
          />
        </div>
      </Default>
    </div>
  );
};

export default User;
