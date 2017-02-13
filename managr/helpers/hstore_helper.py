
def verify_keys_before_save(keys, allowed_keys):
	unallowed_keys = []
	for key in keys:
		if key not in allowed_keys:
			unallowed_keys.append(key)

	if len(unallowed_keys) == 0:
		return True
	else:
		return unallowed_keys_as_string(unallowed_keys)

def unallowed_keys_as_string(unallowed_keys):
	temp_string = ''
	for key in unallowed_keys:
		temp_string = temp_string + key + ' '

	return temp_string.rstrip()

