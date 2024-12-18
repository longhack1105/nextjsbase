import Head from "next/head";
import { Fragment, ReactElement } from "react";
import i18n from "~/locale/i18n";
import BaseLayout from "~/components/layout/BaseLayout";
import Home from "~/components/pages/Home";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Tổng quan")}</title>
      </Head>
      <Home />
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout title={i18n.t("Tổng quan")}>{page}</BaseLayout>;
};
