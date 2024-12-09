import { Menu, PATH, ROLE } from "~/constants/config";
import { RootState } from "~/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

interface IRequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth(props: IRequireAuthProps) {
  const { replace } = useRouter();

  const { loading } = useSelector((state: RootState) => state.site);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { infoUser } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();
  useEffect(() => {
    if (!isLogin && !loading) replace(PATH.Login);
    Menu.forEach((x: any) => {
      (x.group || []).forEach((x2: any) => {
        var roleBlock = x2?.roleBlock || [];
        var path = x2?.path;
        if (!x2?.children || (x2?.children || []).length <= 0) {
          if (path == pathname && roleBlock.includes(infoUser?.role)) {
            replace(PATH.Home);
          }
        } else {
          (x2?.children || []).forEach((x3: any) => {
            path = x3.path;
            if (path == pathname && roleBlock.includes(infoUser?.role)) {
              replace(PATH.Home);
            }
          });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, loading]);

  if (isLogin && !loading) {
    return <>{props.children}</>;
  }

  return <div className="loading-page"></div>;
}
