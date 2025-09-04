"use client";

import { adminUserApi } from "@/api/adminUser";
import { ADMIN_USER_INFO } from "@/consts/storage";
import { setLocalStorage } from "@/utils/localstorageControll";
import { Button, Input } from "@arco-design/web-react";
import { RefInputType } from "@arco-design/web-react/es/Input";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";
import { useCallback, useRef, useState } from "react";

function DashLoginPage() {
  const [loginForm, setLoginForm] = useState({
    uid: "",
    pwd: "",
  });

  const pwdInputRef = useRef<RefInputType>(null);

  const handleLogin = useCallback(async () => {
    if (loginForm.uid && loginForm.pwd) {
      const loginResult = await adminUserApi.login(loginForm);
      setLocalStorage(ADMIN_USER_INFO, loginResult);
      redirect("/dash/article/list");
    }
  }, [loginForm]);

  return (
    <div className="w-full h-full flex-grow flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div>
          <Icon
            icon="clarity:avatar-solid"
            className="w-32 h-32 text-primary-color"
          />
        </div>
        <div className="bg-primary-bg shadow-[3px_3px_10px_1px_rgba(0,0,0,0.1)] rounded-lg p-4">
          <div className="mb-2">
            <label htmlFor="uid" className="mr-2">
              账号:
            </label>
            <Input
              id="uid"
              style={{ width: 350 }}
              value={loginForm.uid}
              onChange={(e) => {
                setLoginForm({
                  ...loginForm,
                  uid: e,
                });
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  pwdInputRef.current?.focus();
                }
              }}
              allowClear
              placeholder="请输入账号"
            />
          </div>
          <div>
            <label htmlFor="pwd" className="mr-2">
              密码:
            </label>
            <Input
              ref={pwdInputRef}
              id="pwd"
              type="password"
              style={{ width: 350 }}
              value={loginForm.pwd}
              onChange={(e) => {
                setLoginForm({
                  ...loginForm,
                  pwd: e,
                });
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              allowClear
              placeholder="请输入密码"
            />
          </div>
          <div className="mt-3">
            <Button onClick={handleLogin} type="primary" className="w-full">
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashLoginPage;
