import { databaseSpy } from "../../mocks/repository/helper/instanceDatabaseSpy";
import { ChangeStatusNotesToTrashRepository } from "../ChangeStatusNotesToTrashRepository";

const instanceChangeStatusNotesToTrashRepository = () => {
  const changeStatusNotesToTrashRepository =
    new ChangeStatusNotesToTrashRepository(databaseSpy);

  return changeStatusNotesToTrashRepository;
};

const changeStatusNotesToTrashRepository =
  instanceChangeStatusNotesToTrashRepository();

export { changeStatusNotesToTrashRepository };
