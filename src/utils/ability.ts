import { Ability, AbilityBuilder } from '@casl/ability';
import { __, equals, ifElse } from 'ramda';
import { Role } from '../models/auth';

export type Actions = 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'CV' | 'Dashboard' | 'Folders' | 'Templates';
type AppAbility = Ability<[Actions, Subjects]>;

export function defineAbilityForUser(can: any, cannot: any) {
  can('read', 'CV');
  can('create', 'CV');
  can('update', 'CV');
  can('read', 'Dashboard');
  can('read', 'Templates');
  cannot('read', 'Folders');
  cannot('read', 'Users');
}

export function defineAbilityForAdmin(can: any, cannot: any) {
  can('read', 'CV');
  can('create', 'CV');
  can('update', 'CV');
  can('read', 'Dashboard');
  can('read', 'Templates');
  can('read', 'Folders');
  can('update', 'Folders');
  can('create', 'Folders');
  can('delete', 'Folders');
  can('read', 'Users');
}

export function updateAbility(ability: Ability, role: Role) {
  const { rules, can, cannot } = new AbilityBuilder<AppAbility>();

  ifElse(
    equals(__, 'USER'),
    () => defineAbilityForUser(can, cannot),
    () => defineAbilityForAdmin(can, cannot)
  )(role);

  ability.update(rules);
}

export const ability = new Ability<[Actions, Subjects]>();
