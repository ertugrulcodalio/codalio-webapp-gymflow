import { useEffect, useState } from 'react';
import { RhinoContext, useRhinoContext } from '@rhino-project/core';
import {
  useModelShow,
  useUser,
} from '@rhino-project/core/hooks';

export const AppOwnerProvider = ({ children }) => {
  const user = useUser();
  const rhinoContext = useRhinoContext();
  const [baseOwner, setBaseOwner] = useState(null);
  const [resolving, setResolving] = useState(true);
  const [usersRoles, setUsersRoles] = useState([]);
  const {
    isSuccess,
    isInitialLoading,
    resource: account,
  } = useModelShow('account', null, { queryOptions: { enabled: !!user } });

  useEffect(() => {
    if (!user) {
      setBaseOwner(null);
      setUsersRoles([]);
      setResolving(false);
      return;
    }
    if (isInitialLoading) return;
    if (!isSuccess || !account) {
      setResolving(false);
      return;
    }
    const roles = account.users_roles ?? [];
    setUsersRoles(roles);
    setBaseOwner(roles[0]?.organization ?? null);
    setResolving(false);
  }, [user, isSuccess, isInitialLoading, account]);

  if (!user) return children;
  if (resolving) return null;

  return (
    <RhinoContext.Provider
      value={{ ...rhinoContext, baseOwner, usersRoles, setBaseOwner }}
    >
      {children}
    </RhinoContext.Provider>
  );
};
