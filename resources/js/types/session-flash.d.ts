import * as icons from '@tabler/icons-react';
import { PageProps } from '.';

export interface SessionFlashType {
    status?: string;
    title?: string;
    message?: string;
    icon?: keyof typeof icons;
    className?: string;
}

export interface SessionFlash extends PageProps {
    session_flash: SessionFlashType;
}
