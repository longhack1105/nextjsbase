import ImageFill from '~/components/common/ImageFill';
import { PropsBaseFormAuth } from './interfaces';
import RequiredLogout from '~/components/protected/RequiredLogout';
import icons from '~/constants/images/icons';
import styles from './BaseFormAuth.module.scss';
import Image from 'next/image';
import LanguageButton from '~/components/common/Languages/LanguageBtn';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

function BaseFormAuth({ title, note, children }: PropsBaseFormAuth) {
  const params = useRouter();

  return (
    <RequiredLogout>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.body}>
            {params.asPath !== '/auth/forgot-pass' && <LanguageButton />}
            <div className={styles.form}>
              <div className={styles.box_title}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.note}>{note}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </RequiredLogout>
  );
}

export default BaseFormAuth;
