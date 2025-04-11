/**
 * Created by Wilton Oliveira Ferreira on 20/02/2023
 */

import { SetMetadata } from '@nestjs/common'

export const PERMISSIONS_KEY = 'permissions'
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions)
