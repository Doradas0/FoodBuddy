import { Storage } from 'aws-amplify';

export const s3Upload = file => {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

export const s3Get = key => {
  return await Storage.vault.get(key)
}
