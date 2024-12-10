import { Fragment, ReactElement, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import BaseFormAuth from "~/components/pages/auth/BaseFormAuth";
import LoginForm from "~/components/pages/auth/LoginForm";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Login.login")}</title>
      </Head>
      <BaseFormAuth
        title={"Đăng nhập"}
        note={"Chào mừng đến với hệ thống"}
      >
        <LoginForm />
      </BaseFormAuth>
    </Fragment>
  );
}
